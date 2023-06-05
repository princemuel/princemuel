export function YoutubePlayer({ slug }: IParams) {
  return (
    <div className='aspect-w-16 aspect-h-9'>
      <iframe
        src={`https://www.youtube.com/embed/${slug}`}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      />
    </div>
  );
}
