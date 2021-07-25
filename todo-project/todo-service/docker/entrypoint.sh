#!/bin/bash -e

set -x

#-----------------------------------
#   JVM PROPERTIES AND OS SETTINGS
#-----------------------------------

[ -z "${SVC_HOME}" ] && SVC_HOME=/opt/app
[ -z "${HEAP_DUMP_DIR}" ] && HEAP_DUMP_DIR=${SVC_HOME}/heaps && mkdir -p ${SVC_HOME}/heaps

## Be receptive to core dumps
ulimit -c unlimited

## Allow high connection count per process (raise file descriptor limit)
ulimit -n 65536

## Extend JAVA_OPTS with defaults
JAVA_OPTS="${JAVA_OPTS:-}"
JAVA_OPTS+=" -showversion"
JAVA_OPTS+=" -XX:+PrintCommandLineFlags"
JAVA_OPTS+=" -Dfile.encoding=UTF-8"
JAVA_OPTS+=" -Dlog4j.configurationFile=${SVC_HOME}/log4j2.xml"
JAVA_OPTS+=" -XX:+UseStringDeduplication -XX:+PrintStringTableStatistics"
JAVA_OPTS+=" -Xlog:gc*:stdout:time,level,tags"

# use parallel GC if no GC is added in JAVA_OPTS - the default G1 uses too much off-heap memory
if ! grep -E 'UseG1GC|UseConcMarkSweepGC|UseEpsilonGC|UseParallelGC|UseSerialGC|UseZGC' <<< "$JAVA_OPTS" > /dev/null
then
  echo "Setting GC to ParallelGC"
  JAVA_OPTS+=" -XX:+UseParallelGC"
fi

if [ -n "${JVM_METASPACE}" ]
then
  echo "SYSTEM PROPERTIES: Setting JVM metaspace to ${JVM_METASPACE}"
  JAVA_OPTS+=" -XX:MetaspaceSize=${JVM_METASPACE} -XX:MaxMetaspaceSize=${JVM_METASPACE}"

fi

if [ -n "${JVM_HEAP}" ]
then
  echo "SYSTEM PROPERTIES: Setting JVM heap to ${JVM_HEAP}"
  JAVA_OPTS+=" -Xms${JVM_HEAP} -Xmx${JVM_HEAP}"
fi

## Adding Heap Dump on OOM flag in the JAVA OPTS
JAVA_OPTS+=" -Xss512K"
HEAP_DUMP_PATH="$HEAP_DUMP_DIR/$( date '+%Y-%m-%d_%H:%M:%S' )_heap_dump.hprof"
JAVA_OPTS+=" -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=$HEAP_DUMP_PATH"
JAVA_OPTS+=" -XX:+ExitOnOutOfMemoryError -XX:ErrorFile=/var/log/java_error_%p.log"

#---------------------
#  SPRING PROPERTIES
#---------------------
## SPRING ACTIVE PROFILES
export SPRING_PROFILES_ACTIVE_VALUE="prod"

echo "server.max-http-header-size=64000" >> $SVC_HOME/application.properties
echo "server.tomcat.accesslog.enabled=true" >> $SVC_HOME/application.properties
echo "server.tomcat.accesslog.pattern=%{YYYY-MM-dd'T'HH:mm:ss.SSSX}t [priority='INFO' thread='%I' user='%{user}r' trace='%{x-request-id}r'] %r %s bytes='%b' duration='%D'" >> $SVC_HOME/application.properties
echo "server.tomcat.accesslog.directory=/dev" >> $SVC_HOME/application.properties
echo "server.tomcat.accesslog.prefix=stdout" >> $SVC_HOME/application.properties
echo "server.tomcat.accesslog.suffix=" >> $SVC_HOME/application.properties
echo "server.tomcat.accesslog.buffered=false" >> $SVC_HOME/application.properties
echo "server.tomcat.accesslog.file-date-format=" >> $SVC_HOME/application.properties

## SPRING APPLICATION SETTINGS
echo "server.port=8081" >> $SVC_HOME/application.properties
echo "server.servlet.context-path=/todo" >> $SVC_HOME/application.properties
echo "spring.main.banner-mode=off" >> $SVC_HOME/application.properties
echo "spring.main.allow-bean-definition-overriding=false" >> $SVC_HOME/application.properties
echo "server.shutdown=graceful" >> $SVC_HOME/application.properties
echo "spring.lifecycle.timeout-per-shutdown-phase=25s" >> $SVC_HOME/application.properties

## SECURITY SETTINGS
echo "spring.security.oauth2.client.registration.okta.authorization-grant-type=CLIENT_CREDENTIALS" >> $SVC_HOME/application.properties
if [ -n "${OKTA_CLIENT_ID}" ]; then
  echo "spring.security.oauth2.client.registration.okta.client-id=${OKTA_CLIENT_ID}" >> $SVC_HOME/application.properties
fi
if [ -n "${OKTA_CLIENT_SECRET}" ]; then
  echo "spring.security.oauth2.client.registration.okta.client-secret=${OKTA_CLIENT_SECRET}" >> $SVC_HOME/application.properties
fi
echo "spring.security.oauth2.resourceserver.jwt.issuer-uri=https://dev-117675.okta.com/oauth2/default" >> $SVC_HOME/application.properties

## SPRING DATASOURCE SETTINGS
echo "spring.datasource.url=${DATASOURCE_URL}" >> $SVC_HOME/application.properties
echo "spring.datasource.username=${DATASOURCE_USER}" >> $SVC_HOME/application.properties
echo "spring.datasource.password=${DATASOURCE_PASS}" >> $SVC_HOME/application.properties
echo "spring.datasource.hikari.register-mbeans=true" >> $SVC_HOME/application.properties
echo "spring.datasource.hikari.maximum-pool-size=100" >> $SVC_HOME/application.properties
echo "spring.datasource.hikari.minimum-idle=10" >> $SVC_HOME/application.properties

echo "spring.jpa.database-platform=org.dev.sbc.jpa.hibernate.CustomPostgresDialect" >> $SVC_HOME/application.properties
echo "spring.jpa.show-sql=false" >> $SVC_HOME/application.properties
echo "spring.jpa.generate-ddl=false" >> $SVC_HOME/application.properties
echo "spring.jpa.open-in-view=false" >> $SVC_HOME/application.properties
echo "spring.jpa.hibernate.ddl-auto=none" >> $SVC_HOME/application.properties
echo "spring.jpa.properties.hibernate.format_sql=false" >> $SVC_HOME/application.properties
echo "spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true" >> $SVC_HOME/application.properties

echo "spring.liquibase.enabled=true" >> $SVC_HOME/application.properties
echo "spring.liquibase.drop-first=true" >> $SVC_HOME/application.properties
echo "spring.liquibase.change-log=classpath:/db/changelog/liquibase-changelog-main.xml" >> $SVC_HOME/application.properties

## SPRING ACTUATOR SETTINGS
echo "management.endpoints.enabled-by-default=false" >> $SVC_HOME/application.properties
echo "management.endpoints.web.exposure.include=health,info" >> $SVC_HOME/application.properties
echo "management.endpoints.web.base-path=/api" >> $SVC_HOME/application.properties
echo "management.endpoint.info.enabled=true" >> $SVC_HOME/application.properties
echo "management.endpoint.health.enabled=true" >> $SVC_HOME/application.properties
echo "management.endpoint.health.show-details=NEVER" >> $SVC_HOME/application.properties
echo "management.endpoint.health.show-components=NEVER" >> $SVC_HOME/application.properties
echo "management.endpoint.health.probes.enabled=true" >> $SVC_HOME/application.properties
echo "management.info.defaults.enabled=true" >> $SVC_HOME/application.properties
echo "management.info.build.enabled=false" >> $SVC_HOME/application.properties
echo "management.info.env.enabled=false" >> $SVC_HOME/application.properties
echo "management.info.git.enabled=true" >> $SVC_HOME/application.properties
echo "management.info.git.mode=SIMPLE" >> $SVC_HOME/application.properties

#---------------------------
#  FRAMEWORK PROPERTIES
#---------------------------
echo "sbf.okta.auth.enable-oauth2=false" >> $SVC_HOME/application.properties
echo "sbf.okta.auth.permit-all-paths=/,/error,/webjars/**,/api/swagger/**,/api/health/**,/api/info" >> $SVC_HOME/application.properties
echo "sbf.openapi.swagger-context-path=/api/swagger" >> $SVC_HOME/application.properties
echo "sbf.openapi.base-package=org.dev.todo.todoservice.api.controller" >> $SVC_HOME/application.properties
echo "sbf.openapi.path-ant-pattern=/api/**" >> $SVC_HOME/application.properties
echo "sbf.openapi.group-name=todo" >> $SVC_HOME/application.properties

#------------------------
#  Start the application
#------------------------
# Spring Boot configuration file for the application
config_locations="$SVC_HOME/application.properties"

# this file is created via K8S secrets
okta_properties="/run/okta-config/okta.properties"
if [ -r "${okta_properties}" ] ; then
    config_locations="${config_locations},${okta_properties}"
fi

echo "Scanning directory $SVC_HOME/lib/ to generate classpath"
cp="$SVC_HOME"
set +x
for i in `ls $SVC_HOME/lib/`
do
    echo "$i" | grep 'jar$'
    [ "$?" = 0 ] && cp="$SVC_HOME/lib/$i:$cp"
done

echo "Java Opts: ${JAVA_OPTS}"
echo "Spring Active Profiles: ${SPRING_PROFILES_ACTIVE_VALUE}"
echo "Classpath for jvm: ${cp}"
echo "Config Locations: ${config_locations}"

echo "$(date): Starting JVM"

# updating the cwd so that all core dumps are preserved between restarts since /ops/vmware/heaps is a k8s empty-dir
cd ${HEAP_DUMP_DIR}

set +e
exec java ${JAVA_OPTS} \
     -cp "${cp}" org.dev.todo.todoservice.TodoServiceApplication \
     --spring.profiles.active=$SPRING_PROFILES_ACTIVE_VALUE \
     --spring.config.location=$config_locations "$@"
set -x
status=$?
set -e

echo "$(date): JVM exited with status code ${status}"
exit ${status}