#yarn build

cd ./public
git remote set-url origin 'git@github.com:LixHu/LixHu.github.io.git'
git commit -m "$(date -S):commit"
git push -f origin master
cd ../