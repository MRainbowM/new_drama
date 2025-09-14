.PHONY: deploy-prod

deploy-prod:
	git fetch --all --prune
	git pull --ff-only
	docker-compose -f docker-compose.prod.yml build --pull
	docker-compose -f docker-compose.prod.yml down
	docker-compose -f docker-compose.prod.yml up -d


