#yarn build

cd ./public

git commit -m "$(date -S):commit"
git push -f origin master
cd ../