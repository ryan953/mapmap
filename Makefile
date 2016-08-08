.PHONEY: help

help:
	@grep -e '[a-zA-Z]:.*## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONEY: publish

publish: ## Push code to ryan953.com
	rsync -zhrv -e '/usr/bin/ssh' \
		--bwlimit=2000 \
		--exclude='.git' \
		--exclude='.DS_Store' \
		. ryan953@ryan953.com:/home/ryan953/mapmap.ryan953.com
