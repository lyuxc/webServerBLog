#!/bin/sh
cd /Users/lvxiaochuang/Desktop/CODE-DEMO/blog-1/logs/
cp access.log $(date +%Y-%m-%d-%H:%M).access.log
echo "" > access.log