<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Models\Slider;
use App\Http\Resources\SliderResource;

class SliderController extends BaseController
{
    public function index()
    {
        $sliders = Slider::all();

        return $this->sendResponse(SliderResource::collection($sliders), 'Data retrieved successfully.');
    }



    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required',
            'title' => 'required',
            'caption' => 'required',
        ]);

        Slider::create($request->all());


    }



    public function update(Request $request, Slider $slider)
    {
        $request->validate([
            'image' => 'required',
            'title' => 'required',
            'caption' => 'required',
        ]);

        $slider->update($request->all());

        return redirect()->route('sliders.index')->with('success', 'Slider updated successfully');
    }

    public function destroy(Slider $slider)
    {
        $slider->delete();

        return redirect()->route('sliders.index')->with('success', 'Slider deleted successfully');
    }

}
