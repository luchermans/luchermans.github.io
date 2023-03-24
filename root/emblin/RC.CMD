#!/bin/sh
# -------------------------------------------------------------------
# this script /dos/linux/rc.cmd is executed by init and contains most conf
# if a parameter isn't used set to 0
# -------------------------------------------------------------------
echo "--- rc.cmd starting ---"
# packages to install (order can be importent)
PACKAGE="inetd httpd inetc option lynx htdocs ppp smultita cmu-snmp"

DOMAIN=EmbLin.com

# 1st network interface You must have (normaly eth0, only ne2000)
NETIF_1=dummy0
HOSTNAME_1=luc
IPADDR_1=204.204.204.221
NETWORK_1=204.204.204.0
NETMASK_1=255.255.255.0

# 2nd network interface (eth1, dummy0,...)
NETIF_2=0
HOSTNAME_2=0
IPADDR_2=0
NETWORK_2=0
NETMASK_2=0

# ISP server dialin (see also dialin script at end of file)
ISPmodem=/dev/ttyS0	#com1=/dev/ttyS0  com2=/dev/ttyS1
ISPphone=011500432
ISPname=rc00079175@tv6.net
ISPpasw=amjoovqi

# DNS nameserver (and your ISP DNS)
DNS_1=194.7.1.4
DNS_2=194.7.15.70

# default gateway
DEF_ROUTE=204.204.204.100

# Telnet users
TUSR_1=JefPattat
TPSW_1=OptHoekske
TCMD_1="chroot -u user / /bin/sh"
TUSR_2=EmbLin
TPSW_2=1234
TCMD_2="chroot -u ftp /home/inet /bin/sh"

# HTTPD enable logging
HTTPD_LOG_ENA=0

# MOUNT size /dev/ram1 /home (enter block size)
#MHOME=256
MHOME=0
# -------------------------------------------------------------------
# --------- get kernel boot args
. /etc/cmdline

# --------- busybox ------------
LINKS="chgrp chown clear chroot date dd df dmesg false fdflush find halt kill lenght losetup ls math mkdir mknod mkswap more mv passwd pwd reboot rm rmdir sleep split star swapoff swapon sync touch true tryopen zcat"
for f in $LINKS; do
	ln -s /bin/ln /bin/$f
done

# ------- mount /home --------
LN=ln
if [ $MHOME != 0 ]; then
	mkdir /home
	mkfs.minix -i $MHOME /dev/ram1
	mount /dev/ram1 /home
	LN=cp
fi

# ------- make /usr -------
ln -s /bin /usr/bin
ln -s /sbin /usr/sbin
ln -s /lib /usr/lib

# --------- install packages ------
mount /dos
cd /
echo -n "    Install Pack:"
for f in $PACKAGE; do
	echo -n " $f"
	zcat </dos$EMBDIR/$f.tgz | star
done
echo " done"
umount /dos

# ------- make hardware links for chroot ssh telnet ftp
LINKS="ld-linux.so.1 libc.so.5 libncurses.so.3.0"
for f in $LINKS; do
	$LN /lib/$f /home/inet/lib/$f
done
$LN /etc/ld.so.cache /home/inet/etc/ld.so.cache
$LN /etc/penguin /home/inet/etc/penguin
$LN /bin/sh /home/inet/bin/sh
# ------- secure shell (ssh) can do only ls ...
LINKS="ls pwd cat more"
for f in $LINKS; do
	$LN /bin/ln /home/inet/bin/$f
done

# -------- login for telnet -------
[ $TUSR_1 = 0 ] || echo "[ \$USR = $TUSR_1 ] && [ \$PSW = $TPSW_1 ] && exec $TCMD_1" >>/bin/login
[ $TUSR_2 = 0 ] || echo "[ \$USR = $TUSR_2 ] && [ \$PSW = $TPSW_2 ] && exec $TCMD_2" >>/bin/login
echo "echo Bye" >>/bin/login

# --------- login for ftp administrator --------
cat <<X >>/etc/passwd
FtpAdmin:0:11:0:operator:/home/ftp:/bin/sh
X
passwd FtpAdmin dnstuff
passwd FtpAdmin dnstuff

# ------ disable HTTPD log ------
[ $HTTPD_LOG_ENA = 0 ] && rm /home/inet/logs/mhttpd.log

# --------- add serial ports --------
echo "    setserial ttyS2 - ttyS6 ..."
setserial -b /dev/ttyS2 port 0x03e8 irq 0x05 uart 16550A
setserial -b /dev/ttyS3 port 0x0208 irq 0x07 uart 16550A
setserial -b /dev/ttyS4 port 0x0210 irq 0x0B uart 16550A
setserial -b /dev/ttyS5 port 0x0218 irq 0x0C uart 16550A
setserial -b /dev/ttyS6 port 0x0220 irq 0x0F uart 16550A

# ------- network config --------
echo "    network config ..."
ifconfig lo inet 127.0.0.1 netmask 255.0.0.0
route add -net 127.0.0.0 netmask 255.0.0.0

# ---  insmod dummy0
[ $NETIF_1 = dummy0 ] && insmod /lib/modules/dummy.o
[ $NETIF_2 = dummy0 ] && insmod /lib/modules/dummy.o

ifconfig $NETIF_1 inet $IPADDR_1 netmask $NETMASK_1
route add -net $NETWORK_1 netmask $NETMASK_1
if [ $HOSTNAME_2 != 0 ]; then
	ifconfig $NETIF_2 inet $IPADDR_2 netmask $NETMASK_2
	route add -net $NETWORK_2 netmask $NETMASK_2
fi
[ $DEF_ROUTE != 0 ] && route add default gw $DEF_ROUTE

# --- /etc/hosts --- domainname and hostname ---
echo 127.0.0.1 localhost >/etc/hosts
echo $IPADDR_1 $HOSTNAME_1.$DOMAIN $HOSTNAME_1 >>/etc/hosts
echo $DOMAIN >/proc/sys/kernel/domainname
echo $HOSTNAME_1.$DOMAIN >/proc/sys/kernel/hostname
[ $HOSTNAME_2 != 0  ] && echo $IPADDR_2 $HOSTNAME_2.$DOMAIN $HOSTNAME_2 >>/etc/hosts
# if you use dhcpcd /etc/dhcpc/hostinfo-eth0 holds IPADDR
# . /etc/dhcpc/hostinfo-eth0
# echo $IPADDR $HOSTNAME_1.$DOMAIN $HOSTNAME_1 >>/etc/hosts

# --- /etc/resolv.conf
echo domain $DOMAIN  >/etc/resolv.conf
echo search $DOMAIN >>/etc/resolv.conf
[ $DNS_1 = 0 ] || echo nameserver $DNS_1 >>/etc/resolv.conf
[ $DNS_2 = 0 ] || echo nameserver $DNS_2 >>/etc/resolv.conf

# --- /etc/init.tab -------------------------------------
#syntax A:g:device:program arg0 arg1 arg2 ... arg7
#where	A:action	R=respawn	O=once
#	g:get enter	0:run now 	1:run after enter pressed
#	device:device to run on		ex: /dev/tty1, or ttyS0 ...
# - - - - - - - - - - - - - - - - - - - - - - - - - - - -
cat <<EOF >/etc/init.tab
R:0:/dev/tty1:/sbin/start001.cmd -sh
R:1:/dev/tty2:/bin/sh -sh
R:1:/dev/tty3:/bin/sh -sh
R:1:/dev/tty4:/sbin/mppp /sbin/mppp -verbose -config /home/ppp/mppp.cfg
R:0:/dev/tty9:/sbin/telnetd /sbin/telnetd
R:0:/dev/tty9:/sbin/ftpd /sbin/ftpd
R:0:/dev/tty9:/sbin/tftpd /sbin/tftpd
R:0:/dev/tty9:/sbin/snmpd /sbin/snmpd -v
EOF

# --- /etc/fstab ---
cat <<EOF >>/etc/fstab
/dev/fd0 /floppy msdos rw 0 0
EOF

# --- /sbin/start001.cmd ---
cat <<EOF >/sbin/start001.cmd
#!/bin/sh
. /etc/cmdline
echo "Press help for help"
#/sbin/dhcpcd &
/sbin/mhttpd &
export SHINIT="\`cat /etc/profile\`"
exec /bin/sh
EOF

# --- /sbin/config.cmd ---
cat <<EOF >/sbin/config.cmd
mount /dos
edt /dos$EMBDIR/rc.cmd
cp /dos$EMBDIR/rc.cmd /sbin
umount /dos
echo -----------------------------
echo To apply changes type: rc.cmd
echo -----------------------------
EOF

chmod u+rwx /sbin/*.cmd


# --- ppp config ----------------------------
ln -s $ISPmodem /dev/modem
cat <<EOF >>/home/ppp/mppp.cfg
pppdargs     -detach defaultroute crtscts
MpppLogfile  /home/ppp/mppp.log
Numbers      $ISPphone:57600
Script       /home/ppp/mppp.sep
EOF
# --- Send Expect sequence, Dialin script
cat <<EOF >>/home/ppp/mppp.sep
send ^cr
expect ogin
send $ISPname
send ^cr
expect sword
send $ISPpasw
send ^cr
EOF
# --- start ppp modules
insmod /lib/modules/slhc.o
insmod /lib/modules/slip.o
insmod /lib/modules/ppp.o
echo "--- rc.cmd done ---"
