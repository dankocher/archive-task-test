#!/bin/bash


mkdir __tmp_1_2
rm -rf ./src/components/TTasks/Tasks/Task1
rm -rf ./src/components/TTasks/Tasks/Task2
git clone https://github.com/avtoriscenaria/archive-tasks ./__tmp_1_2
mv ./__tmp_1_2/src/Task1 ./src/components/TTasks/Tasks/Task1
mv ./__tmp_1_2/src/Task2 ./src/components/TTasks/Tasks/Task2
rm -rf __tmp_1_2

mkdir __tmp_3_4
rm -rf ./src/components/TTasks/Tasks/Task3
rm -rf ./src/components/TTasks/Tasks/Task4
git clone https://github.com/KarinaSakuta/Design ./__tmp_3_4
mv ./__tmp_3_4/src/components/Task3 ./src/components/TTasks/Tasks/Task3
mv ./__tmp_3_4/src/components/Task4 ./src/components/TTasks/Tasks/Task4
rm -rf __tmp_3_4