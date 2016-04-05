echo "# ionic" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/fanalert1/ionic.git
git push -u origin master

537  cat .gitignore
  538  git init
  539  git remote add origin https://github.com/fanalert1/ionic.git
  540  git add .
  541  git status
  542  git commit -m "alpha version"
  543  git push -u origin master




 ionic config set dev_push true
 ionic serve --lab

 increment version number in config.xml in main directory
 ionic config set dev_push false
 sudo cordova build --release android
 sudo mv /Users/balagovindanv/Desktop/firefeed/rubyApp/platforms/android/build/outputs/apk/android-release-unsigned.apk /Users/balagovindanv/Desktop/firefeed/rubyApp/FanAlert_unsigned.apk 

 sudo jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore FanAlert_unsigned.apk alias_name

 /Users/balagovindanv/Desktop/firefeed/android_sdk/android-sdk-macosx/build-tools/23.0.2/zipalign -v 4 FanAlert_unsigned.apk FanAlert_Signed.apk

 




 │ Update available: 6.1.1 (current: 6.0.0) │
│ Run npm install -g cordova to update. 



