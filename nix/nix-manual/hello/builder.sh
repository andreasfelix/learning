source $stdenv/setup
echo hier echo ich mal
echo $stdenv
echo $perl
echo $out
echo $src

PATH=$perl/bin:$PATH
tar xvfz $src
cd hello-*
./configure --prefix=$out
make
make install
