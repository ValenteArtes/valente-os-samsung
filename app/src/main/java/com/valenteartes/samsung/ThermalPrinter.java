package com.valenteartes.samsung;

import android.app.Activity;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import org.json.JSONObject;

/** Envia dados ESC/POS (imagem raster montada pela página) para uma impressora térmica na rede, porta 9100. */
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

    private void notifyPage(final boolean ok, final String msg) {
        activity.runOnUiThread(new Runnable() {
            @Override public void run() {
                webView.loadUrl("javascript:(function(){if(typeof window.ValentePrintEvent==='function'){window.ValentePrintEvent("
                        + (ok ? "true" : "false") + "," + JSONObject.quote(msg) + ");}})()");
            }
        });
    }
}
