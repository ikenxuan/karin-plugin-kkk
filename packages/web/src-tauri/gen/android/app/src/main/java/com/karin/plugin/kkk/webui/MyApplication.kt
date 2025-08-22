package com.karin.plugin.kkk.webui

import android.app.Application
import com.facebook.stetho.Stetho

/**
 * 自定义 Application 类，用于初始化 Stetho 调试工具
 */
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        // 仅在 Debug 模式下启用 Stetho
        if (BuildConfig.DEBUG) {
            Stetho.initializeWithDefaults(this)
        }
    }
}