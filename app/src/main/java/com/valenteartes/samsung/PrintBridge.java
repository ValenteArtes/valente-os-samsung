package com.valenteartes.samsung;

import android.content.Context;
import android.os.Build;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

/**
 * Bridge JavaScript → Android PrintManager
 *
 * Uso no JS:
 *   SamsungBridge.imprimirPagina()           → imprime a pagina atual do WebView
 *   SamsungBridge.imprimirHTML("<html>...</html>")  → imprime HTML customizado (ex: etiqueta de OT)
 */
public class PrintBridge {

    private final Context context;
    private final WebView webView;

    public PrintBridge(Context context, WebView webView) {
        this.context = context;
        this.webView = webView;
    }

    /** Imprime a pagina atual visivel no WebView */
    @JavascriptInterface
    public void imprimirPagina() {
        ((android.app.Activity) context).runOnUiThread(() -> {
            try {
                PrintManager pm = (PrintManager) context.getSystemService(Context.PRINT_SERVICE);
                PrintDocumentAdapter adapter = webView.createPrintDocumentAdapter("ValenteOS");
                pm.print("ValenteOS_Print", adapter,
                    new PrintAttributes.Builder()
                        .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
                        .build());
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    /**
     * Imprime HTML customizado (ex: ficha de OT, etiqueta)
     * Chame com: SamsungBridge.imprimirHTML(htmlString, nomeDoc)
     */
    @JavascriptInterface
    public void imprimirHTML(final String html, final String nomeDocumento) {
        ((android.app.Activity) context).runOnUiThread(() -> {
            try {
                // Criar WebView temporario apenas para impressao
                final WebView printView = new WebView(context);
                printView.setWebViewClient(new android.webkit.WebViewClient() {
                    @Override
                    public void onPageFinished(WebView view, String url) {
                        PrintManager pm = (PrintManager) context.getSystemService(Context.PRINT_SERVICE);
                        PrintDocumentAdapter adapter = printView.createPrintDocumentAdapter(
                            nomeDocumento != null ? nomeDocumento : "ValenteOS");
                        pm.print(nomeDocumento != null ? nomeDocumento : "ValenteOS_Doc",
                            adapter,
                            new PrintAttributes.Builder()
                                .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
                                .build());
                    }
                });
                printView.loadDataWithBaseURL(null, html, "text/html", "UTF-8", null);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    /** Retorna true se impressao esta disponivel neste dispositivo */
    @JavascriptInterface
    public boolean impressaoDisponivel() {
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT;
    }
}
