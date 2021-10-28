<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeUserShoprequestsOndelete extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_shoprequests', function (Blueprint $table) {

            $table->dropForeign('user_shoprequests_request_id_foreign');
            $table->dropForeign('user_shoprequests_user_id_foreign');
            $table->foreign('user_request_id')->references('id')->on('user_requests')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
