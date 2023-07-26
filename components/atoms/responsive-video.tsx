export function ResponsiveVideo({ slug }: IParams) {
  return (
    <div className='container relative overflow-auto rounded-xl p-8'>
      <iframe
        className='aspect-video w-full rounded-lg shadow-lg'
        src={`https://www.youtube.com/embed/${slug}`}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen={false}
      />
    </div>
  );
}
