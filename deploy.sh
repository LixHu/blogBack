yarn build

cd ./public
git remote set-url origin2 'git@github.com:LixHu/LixHu.github.io.git'
git add .
git commit -m "$(date -S):commit"
git push -u origin2 master
cd ../