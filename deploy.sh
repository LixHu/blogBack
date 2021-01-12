yarn build

cd ./public
git remote set-url origin 'git@github.com:LixHu/LixHu.github.io.git'
git add .
git commit -m "$(date -S):commit"
git push -u origin master
cd ../