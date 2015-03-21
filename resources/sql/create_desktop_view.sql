DROP VIEW if exists desktop_data
create view desktop_data AS
select desktop.id id, benutzer.name name, apps.title as app, open
from desktop
left join benutzer on benutzer.id = user
left join desktopapps apps on app = apps.id
