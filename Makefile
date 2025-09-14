.PHONY: deploy-prod

deploy-prod:
	git fetch --all --prune
	git pull --ff-only
	docker-compose -f docker-compose.yml build --pull
	docker-compose -f docker-compose.yml down
	docker-compose -f docker-compose.yml up -d


