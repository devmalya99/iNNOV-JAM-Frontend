

const processData = (data)=>{
    const newData = data?.data?.map((item,index) => {
      return {
        student_answer: item.student_answer.replace(/ /g, "\n"),
        suggested_answer: item.suggested_answer.join('\n').replace(/ /g, "\n")
      }
    })
    //console.log(newData)
    return newData
  }

  export default processData;

  