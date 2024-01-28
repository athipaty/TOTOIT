export default function Loading() {
    const renderDivs = () => {
      const divCount = 12;
  
      // Generate an array of div elements
      const divs = Array.from({ length: divCount }, (_, index) => (
        <div key={index} style={{ "--i": index + 1 }}></div>
      ));
  
      return divs;
    };
  
    return <section>{renderDivs()}</section>;
  }
  