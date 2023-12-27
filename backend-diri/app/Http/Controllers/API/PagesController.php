<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Pages;
use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\PagesResource;

class PagesController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $pages = Pages::all();

        return $this->sendResponse(PagesResource::collection($pages), 'Data retrieved successfully.');


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'title' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $pages = Pages::create($input);

        return $this->sendResponse(new PagesResource($pages), 'Data created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($slug): JsonResponse
    {
        $pages = Pages::where('slug', $slug)->first();

        if (is_null($pages)) {
            return $this->sendError('Page not found.');
        }


        return $this->sendResponse(new PagesResource($pages), 'Data retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, pages $pages)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'title' => 'required',
            'content' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $pages->titile = $input['title'];
        $pages->slug = $input['slug'];
        $pages->content = $input['content'];
        $pages->save();

        return $this->sendResponse(new PagesResource($pages), 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
       $pages = Pages::find($id)->delete();

        return $this->sendResponse([], 'Data deleted successfully.');
    }
}
