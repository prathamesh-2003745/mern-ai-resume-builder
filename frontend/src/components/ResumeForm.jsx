const handleGenerate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/resume/generate",
        {
          formData,
          template: selectedTemplate,
        },
        { withCredentials: true }
      );
  
      if (response.data.success) {
        setGeneratedResume(response.data.resume);
      }
    } catch (err) {
      console.error("Error generating resume:", err);
    }
  };
  