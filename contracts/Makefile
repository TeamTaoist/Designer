.PHONY: all build fmt init lint pre-commit test

all: init build test

build:
	@echo ⚙️ Building a release...
	@cargo +nightly b -r --workspace
	@ls -l target/wasm32-unknown-unknown/release/*.wasm
	@rm -rf release
	@mkdir -p release
	@cp target/wasm32-unknown-unknown/release/*.wasm release/
	@cp meta.txt release/

fmt:
	@echo ⚙️ Checking a format...
	@cargo fmt --all --check

init:
	@echo ⚙️ Installing a toolchain \& a target...
	@rustup toolchain add nightly
	@rustup target add wasm32-unknown-unknown --toolchain nightly

lint:
	@echo ⚙️ Running the linter...
	@cargo +nightly clippy --workspace --all-targets -- -D warnings

pre-commit: fmt lint test

test:
	@echo ⚙️ Running tests...
	@cargo +nightly t
