XDG_CONFIG_HOME ?= ~/.config
PLUGIN_DIR = ${XDG_CONFIG_HOME}/yt-dlp/plugins/kindaidouga

all:
	@echo To install: make install
	@false

install:
	mkdir -p ${PLUGIN_DIR}
	ln -s `pwd`/yt_dlp_plugins ${PLUGIN_DIR}

uninstall:
	rm ${PLUGIN_DIR}/yt_dlp_plugins
	rmdir ${PLUGIN_DIR}
