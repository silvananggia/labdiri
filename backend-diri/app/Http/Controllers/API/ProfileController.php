<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\ProfileResource;

class ProfileController extends BaseController
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $Profile = Profile::select('*')->take(1)->get();


        return $this->sendResponse(ProfileResource::collection($Profile), 'Data retrieved successfully.');


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'profile' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $Profile = Profile::create($input);

        return $this->sendResponse(new ProfileResource($Profile), 'Data created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $Profile = Profile::find($id);

        if (is_null($Profile)) {
            return $this->sendError('Data not found.');
        }

        return $this->sendResponse(new ProfileResource($Profile), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Profile $Profile)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'profil' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $Profile->profile = $input['profil'];
        $Profile->visimisi = $input['visimisi'];
        $Profile->tusi = $input['tusi'];
        $Profile->struktur = $input['struktur'];
        $Profile->save();

        return $this->sendResponse(new ProfileResource($Profile), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $Profile = Profile::find($id)->delete();

        return $this->sendResponse([], 'Data deleted successfully.');
    }
}
