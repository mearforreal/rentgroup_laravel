<?php

namespace App\Services;

use App\Mail\NotifyMail;
use App\Models\Part;
use App\Models\User;
use App\Models\UserRequest;
use App\Models\UserShoprequest;
use Illuminate\Support\Facades\Mail;

class UserRequestService
{
    private $manufacturer_id;
    private $price_from;
    private $price_to;
    private $parts_name;
    private $image;



    public function __construct($manufacturer_id, $price_from, $price_to, $parts_name,  $image)
    {

        $this->manufacturer_id = $manufacturer_id;
        $this->price_from = $price_from;
        $this->price_to = $price_to;
        $this->parts_name = $parts_name;

        if($image != null){
            $this->image = $image;
        }else{
            $this->image = '';
        }

    }

    private function searchRequestedParts()
    {
        //TODO if null object then filter
//        return Part::where('manufacturer_id', $this->manufacturer_id)
//            ->where('name', 'like', '%' . $this->parts_name . '%')
//            ->whereBetween('price', [$this->price_from, $this->price_to])->get();

        return User::whereRelation('ownedParts', 'manufacturer_id', $this->manufacturer_id)
            ->whereRelation('ownedParts', 'name', 'like', '%' . $this->parts_name . '%')
            ->whereRelation('ownedParts', 'price', '>=', $this->price_from)
            ->whereRelation('ownedParts', 'price', '<=', $this->price_to)->get();
    }

    public function storeMatchedRequest()
    {
        $found_results = $this->searchRequestedParts();

        if (count($found_results) != 0) {
            $user_id = auth()->user()->id;
            $userRequest = UserRequest::create([
                'manufacturer_id' => $this->manufacturer_id,
                'price_from' => $this->price_from,
                'price_to' => $this->price_to,
                'parts_name' => $this->parts_name,
                'author_id' => $user_id,
                'image' => $this->image
            ]);

            $last_req_id = $userRequest->id;

            foreach ($found_results as $res){
                UserShoprequest::create([
                    'user_request_id' => $last_req_id,
                    'user_id' => $res['id']
                ]);

                $emailTo = User::find($res['id'])->email;

                Mail::to($emailTo)->send(new NotifyMail());

            }

            return [
                'message' => 'Found',
                'found_count' => count($found_results)
            ];

        } else {
            return [
                'message' => 'Not found'
            ];
        }
    }



}
