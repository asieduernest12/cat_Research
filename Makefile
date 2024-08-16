
include .env

# Load .env file if it exists
ifneq (,$(wildcard ./.env))
	include .env
	export
endif

# Initialize REPO variable from .env file or use default value
# REPO=${REPO:-hongmhuynh1/cat-research}	
# REPO=$(REPO)

# Initialize BUILD_ID variable from git
BUILD_ID=$(shell git rev-parse --short HEAD)

## helpdocker
help-docker:
	@cat $(MAKEFILE_LIST)


# Command to print initialized variables
print-vars: ## sd
	@echo "REPO: $(REPO)"
	@echo "BUILD_ID: $(BUILD_ID)"

tag-push:
	bash -c "tag=$(BUILD_ID)" docker compose push server"

tag:
	docker tag $(REPO):latest $(REPO):$(BUILD_ID)

build:
	bash -c "BUILD_ID=$(BUILD_ID) docker compose build"
	make tag

run:
	docker run --name cat --rm -P -p 3000:3000 --env-file=.env $(REPO):latest

runv:
	docker run --name cat -p 3000:3000 -v $PWD:/app --rm $(REPO):latest

stop:
	docker stop cat && docker rm cat

at:
	docker attach -it cat sh

push:
	docker push $(REPO):latest $(REPO):"$(BUILD_ID)"
