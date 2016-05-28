# VERSION 0.0.1
# 默认ubuntu server长期支持版本，当前是12.04
FROM ubuntu
# 签名啦
MAINTAINER 642933588 "642933588@qq.com"
<<<<<<< HEAD

=======
ENV REFRESHED_AT 2014-08-18  
ENV TOMCATVER 7.0.63  
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y wget  
RUN (wget -O /tmp/tomcat7.tar.gz http://mirrors.cnnic.cn/apache/tomcat/tomcat-7/v${TOMCATVER}/bin/apache-tomcat-${TOMCATVER}.tar.gz && \  
    cd /opt && \  
    tar zxf /tmp/tomcat7.tar.gz && \  
    mv /opt/apache-tomcat* /opt/tomcat && \  
    rm /tmp/tomcat7.tar.gz)  
ADD ./settom.sh /usr/local/bin/run  
EXPOSE 8080  
CMD ["/bin/sh", "-e", "/usr/local/bin/run"] 
>>>>>>> ae70fd5c2fe7dc9570eaed4fcd6c68c8fb8bfafb
