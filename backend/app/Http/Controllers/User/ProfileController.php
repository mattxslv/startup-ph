<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Users\Requests\UpdateUserProfileRequest;
use App\Models\Users\Resources\UserResources;
use App\Models\Users\User;

class ProfileController extends Controller
{
    /**
     * Show profile
     *
     * @return UserResources
     */
    public function show()
    {
        return new UserResources(User::authenticated());
    }

    /**
     * Update profile
     *
     * @param UpdateUserProfileRequest $request
     * @return UserResources
     */
    public function update(UpdateUserProfileRequest $request)
    {
        $user = User::authenticated();

        $user->update($request->validated());

        return new UserResources($user->fresh());
    }

    /**
     * Delete profile
     *
     * @return UserResources
     */
    public function destroy()
    {
        $user = User::authenticated();

        $user->currentAccessToken()->delete();
        $user->startup()->forceDelete();
        $user->forceDelete();

        return new UserResources(User::authenticated());
    }
}
