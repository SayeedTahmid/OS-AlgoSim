# 🚀 OS Algorithm Simulator - Convert to Android App

## Quick Start (3 Simple Steps!)

### Step 1: Run Setup Script
1. Open **Command Prompt** (not PowerShell)
2. Run as **Administrator**
3. Execute: `setup-android.bat`
4. Wait for all 7 steps to complete

### Step 2: Open in Android Studio
```cmd
npx cap open android
```

### Step 3: Build & Run
- In Android Studio: Click **Build** → **Build APK**
- Or run on emulator/device: **Run** → Select device

**That's it!** Your Android app is ready! 🎉

---

## What's Happening?

The `setup-android.bat` script will:
1. ✅ Install Capacitor CLI globally
2. ✅ Install Capacitor packages
3. ✅ Initialize Capacitor project
4. ✅ Build React web app
5. ✅ Add Android platform
6. ✅ Create native Android project
7. ✅ Sync web app to Android

**No code changes needed!** Your React app runs as-is inside a native Android wrapper.

---

## Detailed Instructions

### Prerequisites

**You need:**
- Node.js & npm (already have ✓)
- Java Development Kit (JDK 11 or higher)
- Android SDK
- Android Studio (recommended)

**Don't have them?** Install in this order:

#### 1. Install JDK 11
- Download from: https://www.oracle.com/java/technologies/javase-jdk11-downloads.html
- Or use: https://adoptopenjdk.net/ (easier)
- Install to default location
- Add to PATH: `C:\Program Files\AdoptOpenJDK\jdk-11.x.x`

#### 2. Install Android Studio
- Download: https://developer.android.com/studio
- Run installer
- Choose "Standard" installation
- Install to default location
- **Important:** Complete the Android SDK Manager setup

#### 3. Set Environment Variables

Open Command Prompt as Administrator:

```cmd
setx JAVA_HOME "C:\Program Files\AdoptOpenJDK\jdk-11.x.x"
setx ANDROID_HOME "C:\Users\%USERNAME%\AppData\Local\Android\Sdk"
```

Then close and reopen Command Prompt for changes to take effect.

---

### Detailed Setup Process

#### 1️⃣ Navigate to Project
```cmd
cd "c:\Users\User\Desktop\OS Project"
```

#### 2️⃣ Install Capacitor CLI
```cmd
npm install -g @capacitor/cli
```

#### 3️⃣ Install Capacitor Packages
```cmd
npm install @capacitor/core @capacitor/cli @capacitor/android
```

#### 4️⃣ Initialize Capacitor
```cmd
npx cap init
```

When prompted:
- **App name:** `OS Algorithm Simulator`
- **App ID:** `com.osalgorithmsimulator.app`
- **Web dir:** `dist`

#### 5️⃣ Build React App
```cmd
npm run build
```

Creates `dist/` folder with compiled web app.

#### 6️⃣ Add Android Platform
```cmd
npx cap add android
```

Creates `android/` folder with native project.

#### 7️⃣ Sync Web App
```cmd
npx cap sync android
```

Copies web app to Android project.

---

## Building the APK

### Option A: Using Android Studio (Easier)

#### Open Android Studio Project
```cmd
npx cap open android
```

This opens your Android project in Android Studio.

#### First-Time Setup (One time only)
1. Click **Tools** → **SDK Manager**
2. Go to **SDK Platforms** tab
3. Install:
   - Android 12 or higher (API level 31+)
   - Android SDK Build-Tools (matching version)
4. Click **Apply** → **OK**

#### Build APK
1. Click **Build** menu
2. Select **Build Bundle / APK**
3. Choose **APK**
4. Select build variant:
   - **debug** for testing
   - **release** for distribution
5. Click **Finish**

Wait for build to complete.

### Option B: Using Command Line

```cmd
cd android
gradlew build
cd ..
```

Build files will be in: `android/app/build/outputs/`

---

## Testing on Android

### Method 1: Android Emulator (Free)

#### Create Virtual Device
1. In Android Studio, click **AVD Manager** (tools icon)
2. Click **Create Virtual Device**
3. Select **Pixel 4** or **Pixel 5**
4. Click **Next**
5. Select **Android 12 or higher**
6. Click **Next** → **Finish**

#### Run Emulator
1. In AVD Manager, click play icon ▶️
2. Emulator window opens
3. Wait 30-60 seconds for full boot

#### Install APK on Emulator
```cmd
REM After building APK
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

Or drag-and-drop APK onto emulator window.

### Method 2: Physical Android Phone

#### Enable Developer Mode
1. On phone: Settings → About Phone
2. Tap "Build Number" 7 times
3. Go back to Settings → Developer Options
4. Enable "USB Debugging"

#### Connect to PC
1. Connect phone to PC via USB cable
2. Click "Allow" on phone to authorize
3. Wait for device to appear in Android Studio

#### Run App
1. In Android Studio, click **Run** (green play button)
2. Select your phone device
3. Click **OK**

App installs and runs automatically!

---

## Development Workflow

**Every time you change React code:**

```cmd
REM 1. Build React app
npm run build

REM 2. Sync to Android
npx cap sync android

REM 3. Open in Android Studio
npx cap open android

REM 4. Build APK
REM In Android Studio: Build > Build Bundle / APK > APK

REM 5. Test on emulator/device
REM In Android Studio: Run > Select Device
```

---

## Publishing to Google Play Store

### Prerequisites
- Google Account
- $25 registration fee (one-time)

### Step 1: Create Developer Account
1. Go to: https://play.google.com/console
2. Click **Create account**
3. Enter payment information
4. Fill out developer profile

### Step 2: Create App
1. Click **Create app**
2. **App name:** OS Algorithm Simulator
3. **Category:** Education
4. Accept declarations

### Step 3: Generate Signed APK

#### Create Keystore (one-time)
```cmd
keytool -genkey -v -keystore release.jks ^
  -keyalg RSA ^
  -keysize 2048 ^
  -validity 10000 ^
  -alias os-simulator
```

When prompted, enter:
- Keystore password: (create strong password, save it!)
- Key password: (same as keystore password)
- First/Last name: Your Name
- Organization: Your Organization
- City/State/Country: Your Location
- Confirm: y

#### Build Signed APK
In Android Studio:
1. **Build** → **Generate Signed Bundle / APK**
2. Select **APK**
3. Select keystore: `release.jks`
4. Enter passwords
5. Select **release** variant
6. Click **Finish**

### Step 4: Fill App Details

In Google Play Console:

**App Information:**
- Short description (80 chars)
- Full description (4000 chars)
- Category: Education
- Target audience: 13+

**Screenshots:**
- Minimum 2, recommended 6
- Size: 1080×1920 pixels
- Recommended: Show key features

**Graphics:**
- Feature graphic: 1024×500 (required)
- Icon: 512×512 PNG (required)
- Screenshots on all screens

**Content Rating:**
- Fill out questionnaire
- Google auto-assigns rating

### Step 5: Upload APK
1. **Release** → **Production**
2. Click **Create new release**
3. Upload signed APK
4. Enter release notes
5. **Review and publish**

---

## File Structure After Setup

```
OS Project/
├── src/                          (Your React code - UNCHANGED)
├── dist/                         (Built web app)
├── android/                      (Native Android project) ⭐ NEW
│   ├── app/
│   ├── gradle/
│   ├── build.gradle
│   └── gradlew
├── capacitor.config.ts          (Capacitor config) ⭐ NEW
├── node_modules/
├── package.json
└── setup-android.bat            (Setup script)
```

---

## Troubleshooting

### Issue: "Android SDK not found"
**Solution:**
1. Install Android Studio
2. Let it install SDKs automatically
3. Set ANDROID_HOME environment variable:
   ```cmd
   setx ANDROID_HOME "C:\Users\%USERNAME%\AppData\Local\Android\Sdk"
   ```

### Issue: "Java not found"
**Solution:**
1. Install JDK 11 or higher
2. Set JAVA_HOME environment variable:
   ```cmd
   setx JAVA_HOME "C:\Program Files\AdoptOpenJDK\jdk-11.x.x"
   ```

### Issue: "dist folder not found"
**Solution:** Run `npm run build` first

### Issue: "Gradle build failed"
**Solution:**
```cmd
cd android
gradlew clean
gradlew build
cd ..
```

### Issue: App crashes on startup
**Solution:**
1. Check Logcat in Android Studio (View → Tool Windows → Logcat)
2. Look for error messages
3. Ensure app runs on web first: `npm run dev`

### Issue: "Cannot find module" errors
**Solution:**
```cmd
npm install
npm run build
npx cap sync android
```

### Issue: Device not recognized
**Solution:**
1. Enable USB Debugging on phone
2. Authorize connection when prompted
3. Restart adb: `adb kill-server && adb start-server`

---

## Performance Tips

1. **Use Release APK for distribution**
   - Debug APK is ~40 MB
   - Release APK is ~20 MB after optimization

2. **Enable ProGuard Minification**
   - Edit `android/app/build.gradle`
   - Set `minifyEnabled = true` in release config

3. **Test on actual device**
   - Emulator performance ≠ real device
   - Physical testing catches issues early

4. **Monitor app size**
   - Optimize images before adding to project
   - Remove unused dependencies

---

## Quick Commands Reference

```cmd
REM Setup
npm install -g @capacitor/cli
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init
npm run build
npx cap add android
npx cap sync android

REM Development
npm run build                       # Build React app
npx cap sync android               # Sync to Android
npx cap open android               # Open in Android Studio

REM Testing
npx cap run android                # Run on emulator/device
adb devices                         # List connected devices
adb install app-debug.apk          # Install APK

REM Signing
keytool -genkey -v -keystore release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias os-simulator

REM Cleaning
cd android && gradlew clean && cd ..
rm -rf dist node_modules android
```

---

## What Works in Android App

✅ **All React features work identically:**
- CPU Scheduling algorithms
- Memory Management
- Deadlock detection
- Performance Analyzer
- Dashboard
- Navigation
- Charts and visualizations
- Dark theme
- Responsive layout

✅ **Native Android features available:**
- Install from Google Play Store
- Share app results
- Push notifications (if added)
- Camera access (if added)
- File storage (if added)

---

## Support & Resources

- **Capacitor Docs:** https://capacitorjs.com
- **Android Studio Help:** Built-in in Android Studio (Help menu)
- **Google Play Console:** https://play.google.com/console
- **Android Developer Guide:** https://developer.android.com
- **Stack Overflow:** Tag with `capacitor` and `android`

---

## Summary

| Step | What | Time | Result |
|------|------|------|--------|
| 1 | Run setup-android.bat | 10 min | Capacitor initialized |
| 2 | Install Android SDK | 30 min | Android platform ready |
| 3 | Build APK | 5 min | APK file created |
| 4 | Test on device | 10 min | App working on phone |
| 5 | Create Play Store account | - | Developer account ready |
| 6 | Publish app | 10 min | App submitted for review |
| 7 | Wait for approval | 2-3 hours | App on Play Store! |

**Total time: 2-3 hours**
**Code changes: ZERO** ✨

---

## You're Ready! 🎉

Your React app is now an Android app. No code was changed. Everything works the same!

**Questions?** Refer back to this guide or check the resources above.

**Happy developing!** 🚀
