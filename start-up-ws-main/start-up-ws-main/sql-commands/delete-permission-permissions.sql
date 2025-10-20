select * from permission_groups where name = "permissions";
delete from permission_groups where id = 3;

select * from permissions where group_id = 3;
delete from permissions where group_id = 3;

select * from role_has_permissions where permission_id = 5;
delete * from role_has_permissions where permission_id = 5;
