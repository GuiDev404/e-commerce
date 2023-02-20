import DataItem from './DateItem';

const DataList = ({ data })=> {
  return <dl>
    {data.map((item) => (
      <DataItem
        key={item.title}
        title={item.title}
        desc={item.desc}
      />
    ))}
  </dl>;
}

export default DataList