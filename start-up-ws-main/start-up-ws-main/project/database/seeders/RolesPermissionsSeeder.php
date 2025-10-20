<?php

namespace Database\Seeders;

use App\Models\Access\PermissionGroup;
use App\Models\Administrators\Administrator;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class RolesPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // DB::statement('SET FOREIGN_KEY_CHECKS=0');
        // DB::table('model_has_permissions')->truncate();
        // DB::table('model_has_roles')->truncate();
        // DB::table('role_has_permissions')->truncate();
        // DB::table('permission_groups')->truncate();
        // DB::table('permissions')->truncate();
        // DB::table('roles')->truncate();
        // DB::statement('SET FOREIGN_KEY_CHECKS=1');

        if (!$role = Role::first()) {
            $role = Role::create([
                'name' => 'Super-Administrator',
                'guard_name' => 'api'
            ]);
        }

        $groups = [
            [
                'name' => 'administrators',
                'menu' => 'Access Control -> Users',
                'permissions' => [
                    'administrators-view',
                    'administrators-manage',
                ],
            ],
            [
                'name' => 'roles',
                'menu' => 'Access Control -> Roles',
                'permissions' => [
                    'roles-view',
                    'roles-manage',
                ]
            ],
            [
                'name' => 'permissions',
                'menu' => 'Access Control -> Roles',
                'permissions' => [
                    'permissions-view',
                    // 'permissions-manage',
                ],
            ],
            [
                'name' => 'startups',
                'menu' => 'StartUps',
                'permissions' => [
                    'startups-view',
                    'startups-verify',
                    'startups-return',
                    'startups-reject',
                ],
            ],
            [
                'name' => 'requirements',
                'menu' => 'Content Management -> Requirements',
                'permissions' => [
                    'requirements-view',
                    'requirements-manage',
                ],
            ],
            [
                'name' => 'datasets',
                'menu' => 'Content Management -> Datasets',
                'permissions' => [
                    'datasets-view',
                    'datasets-manage',
                ],
            ],
            [
                'name' => 'programs',
                'menu' => 'Programs',
                'permissions' => [
                    'programs-view',
                    'programs-manage',
                ],
            ],
            [
                'name' => 'applications',
                'menu' => 'Programs -> List -> Applicants',
                'permissions' => [
                    'applications-view',
                    'applications-manage',
                    'applications-approve',
                    'applications-return',
                    'applications-reject',
                ],
            ],
            [
                'name' => 'audits',
                'menu' => 'Audit Logs',
                'permissions' => [
                    'audits-view',
                ],
            ],
            [
                'name' => 'news',
                'menu' => 'Content Management -> News',
                'permissions' => [
                    'news-view',
                    'news-manage',
                ],
            ],
            [
                'name' => 'resources',
                'menu' => 'Content Management -> References & Resources',
                'permissions' => [
                    'resources-view',
                    'resources-manage',
                ],
            ],
            [
                'name' => 'assessment-tags',
                'menu' => 'Content Management -> Assessment Tags',
                'permissions' => [
                    'assessment-tags-view',
                    'assessment-tags-manage',
                ],
            ],
        ];

        foreach ($groups as $groupData) {
            $group = PermissionGroup::updateOrCreate(
                ['name' => $groupData['name']],
                [
                    'menu' => $groupData['menu']
                ]
            );

            foreach ($groupData['permissions'] as $permission) {
                $permission = $group->permissions()->updateOrCreate([
                    'name' => $permission,
                    'guard_name' => 'api'
                ]);

                $permission->assignRole($role);
            }
        }

        Administrator::find(1)->assignRole($role);
    }
}
