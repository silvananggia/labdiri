<?php

namespace App\Http\Controllers\API;
use App\Models\User;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\UserResource;

use App\Models\Roles;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $User = User::all();

        return $this->sendResponse(UserResource::collection($User), 'Data retrieved successfully.');


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'nama' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $User = User::create($input);

        return $this->sendResponse(new UserResource($User), 'Data created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $User = User::find($id);

        if (is_null($User)) {
            return $this->sendError('Data not found.');
        }

        return $this->sendResponse(new UserResource($User), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
{
    $input = $request->all();

    $validator = Validator::make($input, [
        'role' => 'required',
        'isVerified' => 'required',
        'lab_id' => 'required',
    ]);

    if ($validator->fails()) {
        return $this->sendError('Validation Error.', $validator->errors());
    }

    $user = User::find($id);

    if (!$user) {
        return $this->sendError('User not found.');
    }

    if ($user->role) {
    $role = Roles::find($user->role->id);

        $role->role = $input['role'];
        $role->isVerified = $input['isVerified'];
        $role->lab_id = $input['lab_id'];
        $role->update(); // Save the updated role

        return $this->sendResponse(new UserResource($user), 'Data updated successfully.');
    }

}



    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $User = User::find($id)->delete();

        return $this->sendResponse([], 'Data deleted successfully.');
    }
}
