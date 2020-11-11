<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NoteRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => [
                'required',
                'string',
                'min:2',
                'max:100',
            ],
            'text' => [
                'required',
                'string',
                'min:2',
                'max:10000',
            ],
            'image' => [
                'image',
                'max:5000',
            ],
        ];
    }
}
