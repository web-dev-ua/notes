<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * Class Note
 *
 * @property int $id
 * @property string $title
 * @property string $text
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @package App\Models
 */
class Note extends Model implements HasMedia
{
    use InteractsWithMedia;
    use HasFactory;

    const MEDIA_IMAGE = 'image';

    protected $fillable = [
        'title',
        'text',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(self::MEDIA_IMAGE)
            ->singleFile();
    }

    public function store(array $payload): self
    {
        $this->fill($payload);
        $this->save();

        if (isset($payload['image'])) {
            $this->addMediaFromRequest('image')
                ->toMediaCollection(self::MEDIA_IMAGE);
        }

        return $this;
    }
}
