WEBDIR = ./web
YARN_INSTALL_FLAGS = --cwd $(WEBDIR) --non-interactive
APP_NAME = go-chat

dev: frontend backend

frontend: yarn_install yarn_build

yarn_install:
	yarn install $(YARN_INSTALL_FLAGS)

yarn_build:
	yarn --cwd $(WEBDIR) run build

backend:
	go build

.PHONY: prod
prod: frontend_prod backend

frontend_prod: yarn_install_prod yarn_build_prod

yarn_install_prod:
	yarn \
		$(YARN_INSTALL_FLAGS) \
		--production=true \
		install

yarn_build_prod:
	yarn --cwd $(WEBDIR) run prod
