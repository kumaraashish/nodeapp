#!/bin/bash
GREEN='\033[1;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}==== Starting SFTP Push${NC}";
sftp -b /dev/fd/0 centos@54.201.254.117 <<EOF
put $(ls *.tar.gz | sort -r | head -1)
bye
EOF

echo -e "${GREEN}==== SFTP Push Complete${NC}";
