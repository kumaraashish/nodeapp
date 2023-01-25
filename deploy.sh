#!/bin/bash
GREEN='\033[1;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}==== Starting SFTP Push${NC}";
sftp -b /dev/fd/0 centos@ec2-52-88-89-227.us-west-2.compute.amazonaws.com <<EOF
put $(ls *.tar.gz | sort -r | head -1)
bye
EOF

sftp -b /dev/fd/0 centos@ec2-34-209-170-147.us-west-2.compute.amazonaws.com <<EOF
put $(ls *.tar.gz | sort -r | head -1)
bye
EOF
echo -e "${GREEN}==== SFTP Push Complete${NC}";
