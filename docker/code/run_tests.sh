#!/bin/bash
MEMORY_LIMIT=${MEMORY_LIMIT:-65536}
TIME_LIMIT=${TIME_LIMIT:-1} 
LANGS=${LANGS:-"cpp"}
LANGT=${LANGT:-"cpp"}

if [ $LANGS = "cpp" ]; then
    g++ -o solution solution.cpp
    if [ $? -ne 0 ]; then
        printf "CE" > output.txt
        exit 0
    fi
    (
    ulimit -v $MEMORY_LIMIT
    timeout ${TIME_LIMIT}s ./solution < input.txt > user_output.txt
    )
elif [ $LANGS = "py" ]; then
    (
    ulimit -v $MEMORY_LIMIT
    timeout ${TIME_LIMIT}s python3 solution.py < input.txt > user_output.txt
    )
elif [ $LANGS = "java" ]; then
    javac solution.java
    if [ $? -ne 0 ]; then
        printf "CE" > output.txt
        exit 0
    fi
    (
    timeout ${TIME_LIMIT}s java -Xmx${MEMORY_LIMIT}k solution < input.txt > user_output.txt
    )
fi
EXIT_CODE=$?

if [ $EXIT_CODE -eq 124 ]; then
    printf "TLE" > output.txt
    exit 0
fi
if [ $EXIT_CODE -eq 137 ]; then 
    printf "MLE" > output.txt
    exit 0
fi
if [ $EXIT_CODE -ne 0 ]; then
    printf "RE" > output.txt
    exit 0
fi

sed -e '$s/$/\n/' input.txt user_output.txt > tester_input.txt

if [ $LANGT = "cpp" ]; then
    g++ -o tester tester.cpp
    if [ $? -ne 0 ]; then
        printf "CE" > output.txt
        exit 0
    fi
    ./tester < tester_input.txt > output.txt
elif [ $LANGT = "py" ]; then
    python3 tester.py < tester_input.txt > output.txt
elif [ $LANGT = "java" ]; then
    javac tester.java
    if [ $? -ne 0 ]; then
        printf "CE" > output.txt
        exit 0
    fi
    java tester < tester_input.txt > output.txt
fi