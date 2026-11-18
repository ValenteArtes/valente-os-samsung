package com.valenteartes.samsung;

import android.app.Activity;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import org.json.JSONObject;

/**
 * Envia dados ESC/POS (imagem raster montada pela página) para uma impressora térmica na rede.
 * print(): direto na impressora, porta 9100 (RAW).
 * printLpr(): por uma central de impressão (ex.: TP-LINK TL-PS310U), protocolo LPR na porta 515,
 *             esperando a confirmação da central a cada passo.
 */
public final class ThermalPrinter {
    private final Activity activity;
    private final WebView webView;

    public ThermalPrinter(Activity activity, WebView webView) {
        this.activity = activity;
        this.webView = webView;
    }

    /** Só aceita endereços de rede local (10.x, 172.16-31.x, 192.168.x). */
    private static boolean redeLocal(String ip) {
        if (ip == null || !ip.matches("[0-9]{1,3}(\\.[0-9]{1,3}){3}")) return false;
        String[] p = ip.split("\\.");
        int a, b;
        try { a = Integer.parseInt(p[0]); b = Integer.parseInt(p[1]);
              for (int i = 2; i < 4; i++) if (Integer.parseInt(p[i]) > 255) return false; }
        catch (NumberFormatException e) { return false; }
        return a == 10 || (a == 192 && b == 168) || (a == 172 && b >= 16 && b <= 31);
    }

    @JavascriptInterface public void print(final String ip, final int port, final String base64) {
        if (!redeLocal(ip) || port < 1 || port > 65535 || base64 == null || base64.length() == 0 || base64.length() > 8000000) {
            notifyPage(false, "dados inválidos");
            return;
        }
        new Thread(new Runnable() {
            @Override public void run() {
                Socket s = null;
                try {
                    byte[] data = Base64.decode(base64, Base64.DEFAULT);
                    s = new Socket();
                    s.connect(new InetSocketAddress(ip, port), 5000);
                    s.setSoTimeout(10000);
                    OutputStream out = s.getOutputStream();
                    out.write(data);
                    out.flush();
                    notifyPage(true, "");
                } catch (Exception error) {
                    String m = error.getMessage();
                    notifyPage(false, m == null ? error.getClass().getSimpleName() : m);
                } finally {
                    if (s != null) { try { s.close(); } catch (Exception ignored) {} }
                }
            }
        }).start();
    }

    /** Diz à página que este aplicativo sabe imprimir por central LPR. */
    @JavascriptInterface public boolean temLpr() { return true; }

    @JavascriptInterface public void printLpr(final String ip, final String fila, final String base64) {
        final String q = (fila == null || !fila.matches("[A-Za-z0-9_.-]{1,32}")) ? "lp1" : fila;
        if (!redeLocal(ip) || base64 == null || base64.length() == 0 || base64.length() > 8000000) {
            notifyPage(false, "dados inválidos");
            return;
        }
        new Thread(new Runnable() {
            @Override public void run() {
                Socket s = null;
                try {
                    byte[] data = Base64.decode(base64, Base64.DEFAULT);
                    String host = "tablet";
                    String job = String.valueOf(100 + (int) (Math.random() * 899));
                    String ctrl = "H" + host + "\n" + "Pvalente\n" + "ldfA" + job + host + "\n" + "UdfA" + job + host + "\n";
                    byte[] ctrlBytes = ctrl.getBytes("ISO-8859-1");
                    s = new Socket();
                    s.connect(new InetSocketAddress(ip, 515), 5000);
                    s.setSoTimeout(15000);
                    OutputStream out = s.getOutputStream();
                    InputStream in = s.getInputStream();
                    enviar(out, in, ("\u0002" + q + "\n").getBytes("ISO-8859-1"), "abrir fila");
                    enviar(out, in, ("\u0002" + ctrlBytes.length + " cfA" + job + host + "\n").getBytes("ISO-8859-1"), "anunciar controle");
                    enviar(out, in, comZero(ctrlBytes), "enviar controle");
                    enviar(out, in, ("\u0003" + data.length + " dfA" + job + host + "\n").getBytes("ISO-8859-1"), "anunciar dados");
                    enviar(out, in, comZero(data), "enviar dados");
                    notifyPage(true, "");
                } catch (Exception error) {
                    String m = error.getMessage();
                    notifyPage(false, m == null ? error.getClass().getSimpleName() : m);
                } finally {
                    if (s != null) { try { s.close(); } catch (Exception ignored) {} }
                }
            }
        }).start();
    }

    private static byte[] comZero(byte[] b) throws IOException {
        ByteArrayOutputStream o = new ByteArrayOutputStream(b.length + 1);
        o.write(b);
        o.write(0);
        return o.toByteArray();
    }

    /** Escreve um passo e espera a central responder 0 (aceito). */
    private static void enviar(OutputStream out, InputStream in, byte[] b, String passo) throws IOException {
        out.write(b);
        out.flush();
        int r = in.read();
        if (r != 0) throw new IOException("central recusou (" + passo + ", resposta " + r + ")");
    }

    private void notifyPage(final boolean ok, final String msg) {
        activity.runOnUiThread(new Runnable() {
            @Override public void run() {
                webView.loadUrl("javascript:(function(){if(typeof window.ValentePrintEvent==='function'){window.ValentePrintEvent("
                        + (ok ? "true" : "false") + "," + JSONObject.quote(msg) + ");}})()");
            }
        });
    }
}
