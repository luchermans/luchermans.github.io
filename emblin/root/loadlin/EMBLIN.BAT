@echo off
loadlin zEmblin initrd=fsroot.gz root=/dev/ram EMBDEV=/dev/fd0 EMBTYP=msdos EMBDIR=/emblin
