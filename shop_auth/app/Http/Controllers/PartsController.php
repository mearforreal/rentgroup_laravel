<?php

namespace App\Http\Controllers;

use App\Models\Part;
use App\Services\UserRequestService;
use Illuminate\Http\Request;

class PartsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Part::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = auth()->user()->id;
        $fields = $request->validate([
            'name' => 'required',
            'price' => 'required',
            'manufacturer_id' => 'required',

        ]);
        return Part::create([
            'name' => $fields['name'],
            'price' => $fields['price'],
            'manufacturer_id' => $fields['manufacturer_id'],
            'user_id' => $user_id,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Part::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $part = Part::find($id);
        $part->update($request->all());
        return $part;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Part::destroy($id);
    }

    public function partsOfUser(){
        $user_id = auth()->user()->id;
        $parts = Part::with('manufacturer')->where('user_id',$user_id)->get();

        return $parts;

    }





}
