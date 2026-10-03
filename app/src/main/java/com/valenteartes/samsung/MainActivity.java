package com.valenteartes.samsung;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;
import android.view.GestureDetector;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.EditText;
import android.widget.Toast;
import android.graphics.Color;
import java.io.File;

public class MainActivity extends Activity {

    private WebView webView;

    // v2 — HTML SIMPLIFICADO (ES5), igual ao Positivo: o WebView deste tablet
    // trava no app completo (fica preso na capa / não responde ao toque).
    // Prioridade: sdcard (atualizações OTA sem reinstalar) → asset (sempre
    // disponível) → se nada funcionar, tenta de novo o asset após 10s.
    private static final String SDCARD_URL = "file:///sdcard/ValenteOS_Terminal.html";
    private static final String ASSET_URL  = "file:///android_asset/ValenteOS_Terminal.html";
    // URL do app completo — só usada no escape de admin (ver sairModoKiosk).
    private static final String VALENTE_URL_COMPLETO = "https://calculadora-3d-valente-artes.netlify.app/";
    private static final String ADMIN_PIN   = "3699";

    // Contador de toques no canto superior direito para acionar menu admin
    private int tapCount = 0;
    private long lastTapTime = 0;
    private static final int TAPS_PARA_ADMIN = 7;
    private static final long TAP_TIMEOUT_MS = 3000;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        // Registrar como launcher padrao (silencioso)
        registrarComoLauncher();

        // WebView
        webView = new WebView(this);
        webView.setBackgroundColor(Color.parseColor("#0f172a"));

        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setLoadsImagesAutomatically(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setAllowFileAccessFromFileURLs(true);
        s.setAllowUniversalAccessFromFileURLs(true);
        // Android 7+ suporta TLS 1.2 nativamente no WebView — sem necessidade de NativeBridge
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);

        // Bridge para impressao (ValenteOS_Terminal.html chama SamsungBridge.imprimirHTML/imprimirPagina)
        webView.addJavascriptInterface(new PrintBridge(this, webView), "SamsungBridge");

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onJsAlert(WebView v, String url, String msg, final JsResult r) {
                new AlertDialog.Builder(MainActivity.this)
                    .setMessage(msg)
                    .setPositiveButton("OK", (d, w) -> r.confirm())
                    .setCancelable(false).show();
                return true;
            }
            @Override
            public boolean onJsConfirm(WebView v, String url, String msg, final JsResult r) {
                new AlertDialog.Builder(MainActivity.this)
                    .setMessage(msg)
                    .setPositiveButton("Confirmar", (d, w) -> r.confirm())
                    .setNegativeButton("Cancelar",  (d, w) -> r.cancel())
                    .setCancelable(false).show();
                return true;
            }
        });

        webView.setWebViewClient(new WebViewClient() {
            private boolean triedSdcard = false;
            private boolean triedAsset  = false;

            @Override
            public void onReceivedError(WebView view, int code, String desc, String failingUrl) {
                if (failingUrl == null) return;
                if (failingUrl.contains("sdcard") && !triedAsset) {
                    // sdcard falhou (nao montado ainda?) -> usar asset embutido no APK
                    triedAsset = true;
                    view.loadUrl(ASSET_URL);
                } else if (failingUrl.contains("android_asset")) {
                    // asset falhou (nao deveria acontecer) -> tenta de novo apos 10s
                    new Handler().postDelayed(() -> webView.loadUrl(ASSET_URL), 10000);
                } else {
                    // falhou carregando o app completo (escape de admin) -> volta pro terminal
                    new Handler().postDelayed(() -> webView.loadUrl(ASSET_URL), 10000);
                }
            }
        });

        // Detector de toques no canto superior direito (para acionar admin)
        webView.setOnTouchListener((v, event) -> {
            if (event.getAction() == MotionEvent.ACTION_DOWN) {
                detectarToquesAdmin(event);
            }
            return false; // deixar WebView processar normalmente
        });

        setContentView(webView);

        // Verificar sdcard primeiro (permite atualizacoes sem reinstalar APK)
        File sdcardFile = new File("/sdcard/ValenteOS_Terminal.html");
        File mntFile    = new File("/mnt/sdcard/ValenteOS_Terminal.html");
        if (sdcardFile.exists() || mntFile.exists()) {
            webView.loadUrl(SDCARD_URL);
        } else {
            webView.loadUrl(ASSET_URL);
        }
    }

    private void detectarToquesAdmin(MotionEvent event) {
        // Zona ativa: canto superior direito (ultimos 15% da largura, primeiros 10% da altura)
        float x = event.getX();
        float y = event.getY();
        float w = webView.getWidth();
        float h = webView.getHeight();

        boolean naZonaAdmin = (x > w * 0.85f) && (y < h * 0.10f);
        if (!naZonaAdmin) return;

        long agora = System.currentTimeMillis();
        if (agora - lastTapTime > TAP_TIMEOUT_MS) {
            tapCount = 0;
        }
        lastTapTime = agora;
        tapCount++;

        if (tapCount >= TAPS_PARA_ADMIN) {
            tapCount = 0;
            mostrarDialogAdmin();
        }
    }

    private void mostrarDialogAdmin() {
        final EditText input = new EditText(this);
        input.setHint("PIN Admin");
        input.setInputType(android.text.InputType.TYPE_CLASS_NUMBER |
                          android.text.InputType.TYPE_NUMBER_VARIATION_PASSWORD);

        new AlertDialog.Builder(this)
            .setTitle("Modo Admin")
            .setMessage("Digite o PIN para acessar o sistema completo:")
            .setView(input)
            .setPositiveButton("Entrar", (d, w) -> {
                String pin = input.getText().toString().trim();
                if (ADMIN_PIN.equals(pin)) {
                    sairModoKiosk();
                } else {
                    Toast.makeText(this, "PIN incorreto", Toast.LENGTH_SHORT).show();
                }
            })
            .setNegativeButton("Cancelar", null)
            .show();
    }

    private void sairModoKiosk() {
        // v2 — não há mais "overlay-operador"/"loadAll" no terminal simplificado.
        // O escape de admin agora carrega o app completo de verdade (ciente de
        // que ele pode não funcionar bem no WebView deste tablet — é só pra
        // configuração pontual, não pro uso diário). Reiniciar o app volta
        // pro terminal simplificado normalmente.
        webView.loadUrl(VALENTE_URL_COMPLETO);
        Toast.makeText(this, "Sistema completo (admin) — reinicie o app pra voltar ao terminal", Toast.LENGTH_LONG).show();
    }

    private void registrarComoLauncher() {
        try {
            PackageManager pm = getPackageManager();
            ComponentName self = new ComponentName(this, MainActivity.class);
            // Desabilitar launcher Samsung
            String[] outros = {
                "com.sec.android.app.launcher/.activities.LauncherActivity",
                "com.android.launcher2/.Launcher"
            };
            for (String c : outros) {
                try {
                    pm.setComponentEnabledSetting(
                        ComponentName.unflattenFromString(c),
                        PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                        PackageManager.DONT_KILL_APP);
                } catch (Throwable ignore) {}
            }
            IntentFilter f = new IntentFilter(android.content.Intent.ACTION_MAIN);
            f.addCategory(android.content.Intent.CATEGORY_HOME);
            f.addCategory(android.content.Intent.CATEGORY_DEFAULT);
            pm.addPreferredActivity(f, IntentFilter.MATCH_CATEGORY_EMPTY, new ComponentName[]{self}, self);
        } catch (Throwable t) { /* silencioso */ }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        // Bloquear BACK e MENU em modo normal
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            if (webView.canGoBack()) webView.goBack();
            return true;
        }
        if (keyCode == KeyEvent.KEYCODE_MENU) return true;
        return super.onKeyDown(keyCode, event);
    }

    @Override protected void onResume() { super.onResume(); webView.onResume(); }
    @Override protected void onPause()  { super.onPause();  webView.onPause();  }
}
