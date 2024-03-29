set -e
unset PATH
for path in $baseInputs $buildInputs; do
    export PATH=$path/bin${PATH:+:}$PATH
done

function unpackPhase() {
  tar -xf $src

  for d in *; do
      if [ -d "$d" ]; then
          cd $d
          break
      fi
  done
}

function configurePhase() {
    ./configure --prefix=$out
}

function buildPhase() {
    make
}

function installPhase() {
    make install
}

function fixupPhase() {
    find $out -type f -exec patchelf --shrink-rpath '{}' \; -exec strip '{}' \; 2>/dev/null
}

function genericBuild() {
    unpackPhase
    configurePhase
    buildPhase
    installPhase
    fixupPhase
}
