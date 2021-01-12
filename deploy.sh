yarn build

cd ./public
git init
git remote add origin2 'git@github.com:LixHu/LixHu.github.io.git'
git remote set-url origin2 'git@github.com:LixHu/LixHu.github.io.git'
git add ./
git commit -m "$(date -S):commit"
git push -u origin2 master
cd ../