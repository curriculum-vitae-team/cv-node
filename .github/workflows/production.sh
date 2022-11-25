scp -r src .env nest-cli.json package.json tsconfig.* yarn.lock devss@10.90.15.143:cv-node

ssh -tt -vvv devss@10.90.15.143

killall node

cd cv-node

yarn --frozen-lockfile

yarn build

sudo node cv-node/dist/main
