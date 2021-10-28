<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeUserShoprequestsColumnName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_shoprequests', function (Blueprint $table) {

            $table->renameColumn('request_id', 'user_request_id');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_shoprequests', function (Blueprint $table) {

            $table->renameColumn('user_request_id', 'request_id');

        });
    }
}
