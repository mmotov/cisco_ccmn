npm run-script build
mkdir ./bot/public/
cp -R build/* ./bot/public/
rm -rf build
node bot/bot.js
