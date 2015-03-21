drop view if exists desktop_data;
create view desktop_data AS 
select desktop.id id, benutzer.name name, desktop.app appID, apps.title app, desktop.open open
from desktop 
left join benutzer on benutzer.id = desktop.user
left join desktopApps apps on desktop.app = apps.id;