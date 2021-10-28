<?php

namespace App\Http\Controllers;

use App\Models\UserRequest;
use App\Services\UserRequestService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserRequestsController extends Controller
{


    public function search(Request $request)
    {

        $valid_fields = $request->validate([
            'manufacturer_id' => 'required',
            'price_from' => 'required',
            'price_to' => 'required',
            'parts_name' => 'required',
            'image' => 'mimes:jpeg,jpg,png|max:15000'
        ]);
        $image = '';
        if ($request->hasFile('image')) {
            $request->image->store('requests', 'public');
            $image = $request->image->hashName();
        }


        $userRequestPart = new UserRequestService($valid_fields['manufacturer_id'],
            $valid_fields['price_from'],
            $valid_fields['price_to'],
            $valid_fields['parts_name'],
            $image
        );

        $response = $userRequestPart->storeMatchedRequest();

        return response($response, 201);


    }

    public function image($fileName)
    {
        $path = storage_path() . '/app/public/requests/' . $fileName;
        return response()->download($path) ;
    }

    public function getRequestedParts()
    {
        return auth()->user()->shopRequests()->get();
    }


}
